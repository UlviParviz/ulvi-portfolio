import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import ContactScene from "./ContactScene";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current || loading) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service is not configured yet.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });

      toast.success("Your message has been sent successfully.");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Message could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-section__header">
        <div>
          <span className="section-label">Contact</span>
          <h2>Let’s talk</h2>
        </div>

        <p>
          Have a project idea, collaboration request or technical question?
          Send me a message and I will get back to you as soon as possible.
        </p>
      </div>

      <div className="contact-section__layout">
        <motion.div
          className="contact-scene-wrapper"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <ContactScene />
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card contact-form contact-form--portal"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="contact-form__top">
            <span>Transmission form</span>
            <strong>Send me a message</strong>
          </div>

          <input
            name="from_name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            required
          />

          <input
            name="from_email"
            type="email"
            placeholder="Your email"
            autoComplete="email"
            required
          />

          <input
            name="subject"
            type="text"
            placeholder="Subject"
            required
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows={7}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}