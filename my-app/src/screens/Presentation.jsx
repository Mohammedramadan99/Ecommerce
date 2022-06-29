import React from "react"
import presImg from '../images/12.jpg'
import SectionHeader from '../components/SectionHeader'
import {FaPlay} from 'react-icons/fa'
export default function Presentation() {
    return (
        <section className="presentation">
                {/* <SectionHeader title="" /> */}
            <div className="container">
                <div className="info">
                    <span>نقدم هذا العرض التقديمي من اجلك </span>
                    <h1>  شاهد الفيديو لتعرف اكثر<span>  عن  خدماتي </span> </h1>
                    <p>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                        إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، .
                    </p>
                </div>
                <div className="video">
                    <img src={presImg} alt="" />
                    <div className="info">
                        <div className="text">
                            تصميم موقع متجاوب
                        </div>
                        <div className="icon">
                            <FaPlay/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
