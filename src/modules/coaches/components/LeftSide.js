import React from 'react'
import '../style/index.css'

const LeftSide = ({items}) => {
  return (
    <div className='coach-left-side'>
        <div>
          {items.map((item)=>(
            <div>
              <div className='coach-left-side-top'>
                <img src={item.image} alt="" />
                <p style={{fontSize:"1.1rem"}}>{item.name}</p>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                  <img style={{width:"20px",height:"auto",margin:"0"}} src="/assets/images/active-icon.svg" alt="" />
                  <p style={{fontSize:"0.9rem"}}>{item.active ? "نشط":"مش نشط"}</p>
                </div>
              </div>
              <div>
                <p style={{paddingBottom:"10px"}}>التخصص</p>
                <span>{item.specialty}</span>
                <hr />
              </div>
              <div>
                <p style={{paddingBottom:"10px"}}>{item.degree}</p>
                <span style={{display:"block"}}>{item.study}</span>
                <div className='coach-degree-img'>
                  {item.degree_img.map((img)=>(
                    <img src={img} alt="" />
                  ))}
                </div>
                <div style={{background:"var(--light-bg)",display:"flex",justifyContent:"space-between",padding:"15px", flexWrap:"wrap"}}>
                  <div style={{display:"flex"}}>
                    <img style={{width:"50%"}} src="/assets/images/file.svg" alt="" />
                    <h6 style={{whiteSpace:"pre-wrap"}}>شهادة PDF</h6>
                  </div>
                  <div style={{display:"flex", gap:"15px"}}>
                    <div style={{textAlign:"center"}}>
                      <i style={{fontSize:"1.2rem"}} class="las la-cloud-download-alt"></i>
                      <h6>تحميل</h6>
                    </div>
                    <div style={{textAlign:"center",color:"var(--secondary)"}}>
                      <i style={{fontSize:"1.2rem"}} class="las la-trash"></i>
                      <h6>حذف</h6>
                    </div>
                  </div>

                </div>
                <hr />
              </div>
              <div>
                <p style={{paddingBottom:"10px"}}>الخبرات المهنيه</p>
                <span style={{display:"block"}}>{item.experience}</span>
                <hr />
              </div>
              <div>
              <p style={{paddingBottom:"10px"}}>بيانات التواصل</p>
                    <div style={{marginBottom:"25px"}} className='contact-details'>
                      <i class="las la-phone"></i>
                      <div>
                        <p>رقم الهاتف</p>
                        <p>+20102887641</p>
                      </div>
                    </div>
                    <div className='contact-details'>
                      <i class="las la-credit-card"></i>
                      <div>
                        <p>رقم الهاتف</p>
                        <p>+20102887641</p>
                      </div>
                    </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default LeftSide
