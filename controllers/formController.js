import formDetail from "../models/formDetail.js";

export const detailController = async (req, res) => {
try{
    const { to, from, subject, category, message, referanceno } = req.body;
    //validations
    if (!to) {
      return res.send({ error: "to is Required" });
    }
    if (!from) {
      return res.send({ message: "from is Required" });
    }
    if (!subject) {
      return res.send({ message: "subject is Required" });
    }
    if (!category) {
      return res.send({ message: "category no is Required" });
    }
    if (!message) {
      return res.send({ message: "message is Required" });
    }

const formdetails = await new formDetail({
    to,
    from,
    subject,
    category,
    message,
    referanceno,
  }).save();

  res.status(201).send({
    success: true,
    message: "form submitted Successfully",
    formdetails,
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error in form submission",
    error,
  });
}};

