import nodemailer from 'nodemailer'
export const sendEmail = async ({to, subject,html}) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"yassmenshahen069@gmail.com",
            pass:'omai hgfz tvvz mphk' // todo
        }
    })
    await transporter.sendMail({
        to,
        from:"'<e-comm>'yassmenshahen069@gmail.com", // todo
        subject,
        html
    })

}