import Collapsible from "./Collapsible";

const BKFaq = () => {

    const faqData = [
        {
            question: 'Do your apartments have windows?',
            answer: 'YES! All apartments have windows which can be opened... or closed'
        },
        {
            question: 'Why is my heating bill so high?',
            answer: 'Because you have left your windows open all day.'
        },
        {
            question: 'Why is my apartment so cold?',
            answer: 'Have you closed your windows?'
        }
        // Add more FAQs here
    ];

    return (
        <>
            <div className="cont cont-col gap-24 max-1380 section-title">
                <div className="wrapper cont cont-row gap-24">
                    <div className="cont cont-col gap-24">
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <p className="faq-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                        </p>
                    </div>
                </div>
            </div>
            <div className="cont cnot-col max-1380 centered faq-area">
                <div className="cont cont-col max-1380 centered accordion-container">
                    {faqData.map((faq, index) => (
                        <Collapsible key={index} title={faq.question}>
                            <p>{faq.answer}</p>
                        </Collapsible>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BKFaq