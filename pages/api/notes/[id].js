import dbConnect from "../../../utils/dbConnect";
// import Note from "../../../models/Note";
const Note = require("../../../models/Note.js");
dbConnect();

export default async (req, res) => {
  const id = req.query.id;
  console.log(id);

  if (req.method === "GET") {
    try {
      const note = await Note.findById(id);

      if (!note) {
        res.status(404).json({ success: false });
      }

      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  if (req.method === "PATCH") {
    console.log(`i get in the patch request`);
    try {
      const note = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!note) {
        res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedNote = await Note.findByIdAndDelete(id);

      if (!deletedNote) {
        res.status(404).json({ success: false });
      }

      res.status(200).json({ success: true, data: deletedNote });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
};
