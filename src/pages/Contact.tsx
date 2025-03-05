import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  ZoomControl,
} from "react-leaflet";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Compass,
  Eye,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init("2ARbQ1pqcJ5UGFNc3");

// Use a simpler map style URL that's more reliable
const DARK_MAP_STYLE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// Simplified marker icon setup
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// VIT Bhopal location details (simplified)
const VIT_BHOPAL = {
  name: "VIT Bhopal Boys Hostel",
  coordinates: [23.0774, 76.8511] as [number, number],
  address: "Bhopal-Indore Highway, Kothrikalan, Madhya Pradesh 466114",
};

// Simplified Map Controller
const MapController: React.FC<{
  center: [number, number];
  zoom: number;
}> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1,
    });
  }, [map, center, zoom]);

  return null;
};

// Pulse animation component
const PulseMarker: React.FC<{
  position: [number, number];
}> = ({ position }) => {
  return (
    <>
      <Circle
        center={position}
        pathOptions={{ color: "#00f2ff", fillColor: "#00f2ff" }}
        radius={800}
        className="animate-pulse-slow"
      />
      <Circle
        center={position}
        pathOptions={{
          color: "#00f2ff",
          fillColor: "#00f2ff",
          opacity: 0.2,
          fillOpacity: 0.1,
        }}
        radius={1600}
        className="animate-pulse-slower"
      />
    </>
  );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [mapZoom, setMapZoom] = useState(15);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Fetch weather data (for demonstration)
    const fetchWeather = async () => {
      try {
        // This is just for demonstration - in a real app you would use your API key
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}&appid=YOUR_API_KEY&units=metric`);
        // setWeatherData(response.data);

        // Mock weather data for demonstration
        setWeatherData({
          main: { temp: 22 },
          weather: [{ main: "Clear", description: "clear sky" }],
          name: "New York",
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      return "Please enter a valid email address";
    }

    // Email suggestion for common typos
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];
    const [localPart, domain] = email.split("@");

    if (domain) {
      const suggestion = commonDomains.find(
        (d) =>
          d.length > 3 &&
          domain.length > 3 &&
          (d.includes(domain) || domain.includes(d)) &&
          d !== domain
      );

      if (suggestion) {
        setEmailSuggestion(`Did you mean ${localPart}@${suggestion}?`);
      } else {
        setEmailSuggestion(null);
      }
    }

    return "";
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      errors.email = emailError;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let fieldName: keyof FormData;

    // Map the form field names to state fields
    switch (name) {
      case "from_name":
        fieldName = "name";
        break;
      case "reply_to":
        fieldName = "email";
        break;
      case "subject":
        fieldName = "subject";
        break;
      case "message":
        fieldName = "message";
        break;
      default:
        fieldName = name as keyof FormData;
    }

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Clear error when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }

    // Validate email in real-time
    if (name === "reply_to") {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    try {
      if (formRef.current) {
        const result = await emailjs.sendForm(
          "1245",
          "template_vua78qb",
          formRef.current,
          "2ARbQ1pqcJ5UGFNc3"
        );

        console.log("Email sent successfully:", result);
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setFormStatus("idle");
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus("error");
    }
  };

  // Function to handle map load
  const handleMapLoad = useCallback(() => {
    setIsMapLoaded(true);
  }, []);

  // Function to zoom to location
  const zoomToLocation = useCallback(() => {
    setMapZoom(17);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <div className="w-20 h-1 bg-neon-blue mb-8"></div>
        <p className="text-gray-300 max-w-2xl mb-12">
          Have a project in mind or want to collaborate? Feel free to reach out
          using the form below or through my contact information.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare size={20} className="text-neon-blue" />
                Send a Message
              </h2>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue px-4 py-2 rounded-lg transition-all"
              >
                <Eye size={16} />
                Preview Email
              </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-dark-accent border ${
                      formErrors.name ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue/50`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="reply_to"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-dark-accent border ${
                      formErrors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue/50`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {formErrors.email}
                    </p>
                  )}
                  {emailSuggestion && (
                    <p className="mt-1 text-sm text-neon-blue flex items-center gap-1">
                      <AlertCircle size={12} />
                      {emailSuggestion}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-dark-accent border ${
                    formErrors.subject ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue/50`}
                  placeholder="Project Inquiry"
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {formErrors.subject}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-dark-accent border ${
                    formErrors.message ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue/50`}
                  placeholder="Hello, I'd like to discuss a project..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={formStatus === "submitting"}
                className="flex items-center justify-center gap-2 w-full bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === "submitting" ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-neon-blue border-t-transparent rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-green-400">
                      <Check size={16} />
                      <span>Your message has been sent successfully!</span>
                    </div>
                  </motion.div>
                )}

                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle size={16} />
                      <span>
                        There was an error sending your message. Please try
                        again.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

        {/* Contact Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          {/* Contact Information */}
          <div className="glass rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-neon-blue/10 p-3 rounded-full">
                  <Mail size={20} className="text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-300">Email</h3>
                  <a
                    href="mailto:priyanshuraj21030@gmail.com"
                    className="text-neon-blue hover:underline"
                  >
                    priyanshuraj21030@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-neon-purple/10 p-3 rounded-full">
                  <Phone size={20} className="text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-300">Phone</h3>
                  <a
                    href="tel:+919303515830"
                    className="text-neon-purple hover:underline"
                  >
                    +91 930-351-5830
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-neon-pink/10 p-3 rounded-full">
                  <MapPin size={20} className="text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-300">Location</h3>
                  <p className="text-gray-400">
                    VIT Bhopal Boys Hostel, Madhya Pradesh, India
                  </p>
                  {weatherData && (
                    <p className="text-sm text-gray-500 mt-1">
                      Currently: {weatherData.weather[0].description},{" "}
                      {Math.round(weatherData.main.temp)}°C
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="glass rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Compass className="text-neon-blue" />
                Find Me Here
              </h2>
              <button
                onClick={zoomToLocation}
                className="flex items-center gap-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue px-4 py-2 rounded-lg transition-all"
              >
                <MapPin size={16} />
                Zoom to Location
              </button>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden">
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400">Loading map...</p>
                  </div>
                </div>
              )}

              <MapContainer
                center={VIT_BHOPAL.coordinates}
                zoom={mapZoom}
                className="h-full w-full rounded-lg"
                zoomControl={false}
                whenReady={handleMapLoad}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url={DARK_MAP_STYLE}
                />
                <ZoomControl position="topright" />
                <MapController center={VIT_BHOPAL.coordinates} zoom={mapZoom} />
                <PulseMarker position={VIT_BHOPAL.coordinates} />
                <Marker position={VIT_BHOPAL.coordinates} icon={customIcon}>
                  <Popup className="custom-popup">
                    <div className="p-3 text-dark-bg">
                      <h3 className="font-bold mb-1">Priyanshu Raj</h3>
                      <p className="text-sm font-medium">{VIT_BHOPAL.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {VIT_BHOPAL.address}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Map Features */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: <MapPin size={16} />, label: "Precise Location" },
                { icon: <Compass size={16} />, label: "Campus Landmarks" },
                { icon: <Send size={16} />, label: "Interactive Zoom" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-400 bg-dark-bg/50 p-3 rounded-lg"
                >
                  <span className="text-neon-blue">{feature.icon}</span>
                  {feature.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-dark-bg rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-xl font-bold">Email Preview</h3>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-dark-accent rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-dark-accent rounded-lg p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">From:</p>
                    <p className="text-white">
                      {formData.name} &lt;{formData.email}&gt;
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Subject:</p>
                    <p className="text-white">
                      {formData.subject || "(No subject)"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Message:</p>
                    <p className="text-white whitespace-pre-wrap">
                      {formData.message || "(No message)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 p-4 border-t border-gray-800">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    setIsPreviewOpen(false);
                    formRef.current?.requestSubmit();
                  }}
                  className="flex items-center gap-2 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue px-4 py-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                  Send Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "What services do you offer?",
              answer:
                "I offer web development services including frontend development, full-stack applications, responsive design, and performance optimization.",
            },
            {
              question: "What is your typical project timeline?",
              answer:
                "Project timelines vary depending on complexity, but a typical website takes 2-4 weeks from concept to launch.",
            },
            {
              question: "Do you offer maintenance services?",
              answer:
                "Yes, I offer ongoing maintenance and support packages to keep your website up-to-date and secure.",
            },
            {
              question: "How do we start working together?",
              answer:
                "Simply reach out through the contact form or email me directly. We'll schedule a call to discuss your project requirements.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
