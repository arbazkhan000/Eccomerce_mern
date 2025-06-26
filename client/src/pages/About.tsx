import {motion} from 'framer-motion'


const About: React.FC = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-4xl md:text-5xl font-semibold mb-6">
                        About LUXE
                    </h1>
                    <p className="text-lg text-gray-600">
                        Dedicated to providing exceptional products with a focus
                        on quality, design, and customer experience.
                    </p>
                </motion.div>

                <motion.div
                    className="relative rounded-lg overflow-hidden h-80 md:h-96 mb-16"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1604176424472-812a23fc87e4?q=80&w=2070"
                        alt="Our store"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-3xl md:text-4xl font-semibold">
                            Our Story
                        </h2>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={fadeIn}>
                        <h3 className="text-2xl font-medium mb-4">
                            Our Mission
                        </h3>
                        <p className="text-gray-600">
                            At LUXE, we believe in providing our customers with
                            products that combine aesthetics, functionality, and
                            sustainability. Our mission is to curate collections
                            that inspire and enhance everyday living while
                            maintaining the highest standards of quality and
                            ethical sourcing.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeIn}>
                        <h3 className="text-2xl font-medium mb-4">
                            Our Vision
                        </h3>
                        <p className="text-gray-600">
                            We envision a world where thoughtful design and
                            responsible consumption go hand in hand. Our goal is
                            to be at the forefront of modern retail, setting
                            trends rather than following them, and creating a
                            shopping experience that resonates with our
                            customers' values and aspirations.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mb-16"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h3 className="text-2xl font-medium mb-6 text-center">
                        Our Values
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Quality",
                                description:
                                    "We never compromise on the quality of our products and services.",
                            },
                            {
                                title: "Innovation",
                                description:
                                    "We continuously seek new ideas and approaches to improve our offerings.",
                            },
                            {
                                title: "Sustainability",
                                description:
                                    "We are committed to minimizing our environmental footprint.",
                            },
                            {
                                title: "Community",
                                description:
                                    "We value the relationships we build with our customers and partners.",
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className="p-6 rounded-lg border"
                                variants={fadeIn}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4 className="text-lg font-medium mb-2">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h3 className="text-2xl font-medium mb-4">Get in Touch</h3>
                    <p className="text-gray-600 mb-6">
                        We'd love to hear from you! If you have any questions,
                        feedback, or inquiries, please don't hesitate to contact
                        us.
                    </p>
                    <div className="space-y-2">
                        <p>
                            <strong>Email:</strong> info@luxe-store.com
                        </p>
                        <p>
                            <strong>Phone:</strong> +1 (555) 123-4567
                        </p>
                        <p>
                            <strong>Address:</strong> 123 Fashion Street, New
                            York, NY 10001
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;
