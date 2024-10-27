import {Router} from "express"
import {
    addBook,
    updateDetails,
    deleteBook,
    allBooks,
    bookDetails
}from "../controllers/book.controller.js"

const router = Router();

router.route("/add-book").post(addBook);
router.route("/update-book/:bookId").patch(updateDetails);
router.route("/delete-book/:bookId").delete(deleteBook);
router.route("/all-books").get(allBooks);
router.route("/book-details/:bookId").get(bookDetails);

export default router