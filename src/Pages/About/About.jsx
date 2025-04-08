import React from 'react'
import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'
import './about.css'

export default function About() {
  return (
    <>
        <Header/>

            <section className='about_banner'>
                <div className='container d-flex align-items-center justify-content-center'>
                    <div className='about_Title'>
                        <h1>About Us</h1>
                    </div>
                </div>
            </section>

            <section className='about_description my-5'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6'>
                            <div className='text_left'>
                                <h2>Our Story</h2>

                                <p>Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='image_right'>
                                <img src="/about_img.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='Our_mission_vission'>
                <div className='container'>
                    <div className='row g-5'>
                        <div className='col-lg-4 mb-3'>
                            <div className='mis_box mission'>
                                <div className="title-banner">MISSION</div>
                                <div className="info-card ">
                                    <div className='info-img'>
                                        <img src="/Objects.png" alt="Target Icon"/>
                                    </div>
                                    <p>Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus, ac tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus. </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-3'>
                            <div className='mis_box vision'>
                                <div className="title-banner">VISION</div>
                                <div className="info-card ">
                                    <div className='info-img'>
                                        <img src="/Isolation_Mode.png" alt="Target Icon"/>
                                    </div>
                                    <p>Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus, ac tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-3'>
                            <div className='mis_box values'>
                                <div className="title-banner">VALUES</div>
                                <div className="info-card ">
                                    <div className='info-img'>
                                        <img src="/Isolation_Mode (1).png" alt="Target Icon"/>
                                    </div>
                                    <p>Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus, ac tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='newsleter_subscription mt-5'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-6'>
                            <div className='newsleter_content text-center'>
                                <h3>Subscribe to our newsletter</h3>
                                <p>Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.</p>
                                <form action="">
                                    <input type="email" maxlength="50" required placeholder="Email address"/>
                                    <button class="bt">Subscribe</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            

        <Footer/>
    </>
  )
}
