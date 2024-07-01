import nodemailer from "nodemailer";

const UKR_NET_PASSWORD = "VjMrjjo3Y4SaP2TW";
const UKR_NET_FROM = "tiana_yanush@ukr.net";

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
    const email = { ...data, from: UKR_NET_FROM };
    return transport.sendMail(email);
};

export default sendEmail;
