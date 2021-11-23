import dbConnect from "../../../utils/dbConnect";
// import Note from "../../../models/Note";
const Note = require("../../../models/Note.js");

dbConnect();

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const notes = await Note.find({});

      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  if (req.method === "POST") {
    try {
      const notes = await Note.create(req.body);

      res.status(201).json({ success: true, data: notes });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};
