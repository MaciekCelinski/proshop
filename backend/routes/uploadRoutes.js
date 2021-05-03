import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

// multer library : we define place and a filename for uploaded file
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

// we check if the file we upload has a extension of jpg or jpeg or png
function checkFileType(file, cb) {
	// simple regex
	const filetypes = /jpg|jpeg|png/;
	const extension = filetypes.test(
		path.extname(file.originalname).toLocaleLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (extension && mimetype) {
		return cb(null, true);
	} else {
		cb("Images only!");
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

// routing single image
router.post("/", upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;
