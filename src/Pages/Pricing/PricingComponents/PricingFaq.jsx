import { FaQuestionCircle, FaMoneyBillWave, FaPercentage, FaHandHoldingUsd, FaClock } from "react-icons/fa";

const PricingFaq = () => {
    return (
        <div>
            <div className="bg-background py-12">
                <div className="w-full md:w-10/12 mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-main mb-8">
                        Frequently Asked Questions
                    </h2>

                    {/* FAQ Items */}
                    <div className="space-y-6">
                        {/* Question 1 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title flex items-center gap-4">
                                <FaQuestionCircle className="text-2xl text-supporting" />
                                <h3 className="text-xl font-semibold">How does EzyTicket pricing work?</h3>
                            </div>
                            <p className="collapse-content mt-4 text-gray-600">
                                EzyTicket is completely free to use for organizers. We only charge a <strong>5% fee</strong> on each ticket sold. This fee helps us maintain the platform and provide excellent service.
                            </p>
                        </div>
                        {/* Question 2 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title flex items-center gap-4">
                                <FaMoneyBillWave className="text-2xl text-supporting" />
                                <h3 className="text-xl font-semibold">When do I pay the 5% fee?</h3>
                            </div>
                            <p className="collapse-content mt-4 text-gray-600">
                            The 5% fee is automatically deducted from the total ticket sales. You’ll receive the remaining amount directly after the event.
                            </p>
                        </div>

                        {/* Question 3 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title flex items-center gap-4">
                                <FaPercentage className="text-2xl text-supporting" />
                                <h3 className="text-xl font-semibold">Is the 5% fee negotiable?</h3>
                            </div>
                            <p className="collapse-content mt-4 text-gray-600">
                            Our 5% fee is fixed to ensure we can continue providing a reliable and feature-rich platform for all organizers.
                            </p>
                        </div>

                        {/* Question 4 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title flex items-center gap-4">
                                <FaHandHoldingUsd className="text-2xl text-supporting" />
                                <h3 className="text-xl font-semibold">How do I receive my payments?</h3>
                            </div>
                            <p className="collapse-content mt-4 text-gray-600">
                            Payments are processed securely and transferred to your bank account or preferred payment method within <strong>5-7 business days</strong> after the event.
                            </p>
                        </div>

                        {/* Question 5 */}
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title flex items-center gap-4">
                                <FaClock className="text-2xl text-supporting" />
                                <h3 className="text-xl font-semibold">Can I change the ticket price after sales start?</h3>
                            </div>
                            <p className="collapse-content mt-4 text-gray-600">
                            Yes, you can update ticket prices at any time. However, changes will only apply to new sales, not previously sold tickets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingFaq;