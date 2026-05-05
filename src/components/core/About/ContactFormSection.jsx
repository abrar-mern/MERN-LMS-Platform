import React from 'react'
import ContactForm from "../../ContactPage/ContactForm"

const ContactFormSection = () => {
    return (
        <div className='mx-auto  justify-center  w-[40%] max-w-maxContent py-16 flex flex-col'>
            <h2 className='mx-auto text-3xl font-semibold text-richblack-5 mb-6'>
                Get in Touch
            </h2>
            <p className='text-base font-medium text-richblack-300 lg:w-[95%] mx-auto text-center mb-6'>
                We'd love to here from you, Please fill out this form.
            </p>
            <div>
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactFormSection