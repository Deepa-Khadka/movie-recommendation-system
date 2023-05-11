import React from 'react'
import Layout from '../../Layout/Layout'
import Head from '../../Component/Head'
import { AiOutlineMail} from 'react-icons/ai';


function ContactUs() {
    const ContactData = [
        {
            id:1,
            title:"Email Us",
            info:"Interactively grow ",
            icon:AiOutlineMail,
            contact:"ScreenPlay@gmail.com"

        },
    ]
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <Head title="Contact Us"/>
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row gap-4 xl:gap-16 items-center'>
            <div >
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold '>
              We value your feedback and are always here to help with any questions or concerns you may have.
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
              <p>We value your feedback and are always here to help with any questions or concerns you may have.

If you have any inquiries about our movie recommendation system or need assistance with your account, please don't hesitate to contact us. Our customer support team is available 24/7 to assist you with any issues you may encounter.

You can reach out to us through our contact page, where you can submit your query and receive a response via email. Alternatively, you can reach out to us on our social media channels, where we are active and always happy to engage with our users.

We also have a comprehensive FAQ section on our website, where you can find answers to common questions and concerns.

At our movie recommendation system, we strive to provide our users with the best possible experience. We are committed to continuously improving our platform and welcome any feedback or suggestions that you may have.

Thank you for choosing our movie recommendation system. We look forward to hearing from you!</p>
            </div>
            <div className='grid md:grid-cols-2 gap-6  mt-8'>
               {
                ContactData.map((item) => (
                    <div key={item.id} className=' border border-border flex-col bg-dry rounded-lg text-center'>
                        {/* <span className=" place-items-center 	  rounded-full bg-main text-subMain text-4xl ">
                            <item.icon/>
                        </span>  */}
                         
                        <h5 className='text-xl font-semibold mb-2 '>{item.title}</h5>
                        <p className='mb-0 text-sm text-text font-semibold'>
                            <a href={"mailto:{item.contact}"} className='text-blue-400'>{item.contact}</a>
                        </p>

                    </div>
                ))
               }
               
            
                
             
             
            </div>
           
            </div>
           
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs
