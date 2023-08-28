import { InputWithIcon } from "components";
import React from "react";
import { useTranslation } from "react-i18next";


const Meals = () => {

  const { t } = useTranslation("common");

  return (
    <div>
        <div className="client-meals">

        <div>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBlock:"15px"}}>
                <h5 style={{margin:"0"}}>الوجبه الاولي:الفطور 10:30</h5>
                <img
                    src="/assets/images/active-icon.svg"
                    alt="edit pen icon"
                />
            </div>
            
            <div className="client-recipe">

                <div className="client-recipe-desc">
                    <div>
                        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"5px"}}>
                            <p style={{fontWeight:"500",color:"var(--secondary)",margin:"0"}}>فول بالبيض</p>
                            <img
                                src="/assets/images/edit-icon.svg"
                                alt="edit pen icon"
                            />
                        </div>
                    </div>
                    <small>
                    تخفق البيضه والملح والسكر ثم يضاف الحليب ويخفق، يضاف الدقيق
                    والباكينغ باودر ويخفق، يضاف الفانيليا، الزيت ويخفق.تمسح مقلاة
                    بالزيت وتوضع على النار حتى تسخن، يسكب في وسطها كمية من الخليط، بعد
                    ان تنضج من الجهتين ترفع على طبق.
                    </small>
                    <div>
                        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBlock:"5px"}}>
                                <p style={{fontWeight:"500",color:"var(--secondary)",margin:"0"}}>السعارات الحرارية</p>
                                <img
                                    src="/assets/images/edit-icon.svg"
                                    alt="edit pen icon"
                                />
                        </div>
                    </div>
                    <small>
                    تخفق البيضه والملح والسكر ثم يضاف الحليب ويخفق، يضاف الدقيق
                    </small>
                    <div>
                    <p style={{fontWeight:"500",color:"var(--secondary)",marginBlock:"10px"}}>ملحوظات العميل</p>
                    </div>
                    <small>
                    تخفق البيضه والملح والسكر 
                    </small>
                </div>

                <div className="client-recipe-img">
                    <img style={{width:"100%",maxWidth:"270px",borderRadius:"10px"}} src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                </div>
            </div>
        </div>

        <div>
            <h5 style={{marginBlock:"20px 10px"}}>تقييم الاخصائية</h5>
            <InputWithIcon
                type="text"
                name="text"
                placeholder="تغيير الوجبة"
                icon="las la-edit"
                noBorder
                basic={{ onChange: (e) => console.log(e) }} 
                containerStyle={{
                flexDirection: "row-reverse",
                border: "1px solid rgba(38, 50, 56, 0.1)",
                }}
                style={{ height: "54px" }}
            />
        </div>

        </div>
    </div>
  );
};

export default Meals;
