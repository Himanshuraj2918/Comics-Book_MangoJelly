import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { Book } from "../models/book.models.js";

const addBook = asyncHandler(async(req,res)=>{

    const {bookName,author,year,price,discount,pages,condition,description} = req.body;

    if(
        [bookName,author,year,price,discount,pages,condition].some((field)=> field == null ||
        (typeof field === 'string' && field.trim() === ""))
    ){
        return res.status(400).json({
            status: 400,
            message: "Validation Error",
            error: {
                code: "MISSING_FIELDS",
                description: "Some field value is not passed."
            }
        })
    }

    const bookCondition = await Book.isValidCondition(condition)

    if(!bookCondition) return res.status(400).json({
        status: 400,
        message: "Invalid book condition",
        error: {
            code: "INVALID_CONDITION",
            description: "The book condition must be either 'New' or 'Used'. Please provide a valid condition."
        }
    })

    const book = await Book.create({
        bookName,
        author,
        year,
        price,
        discount,
        pages,
        condition,
        description
    })

    if(!book) return res.status(400).json({
        status: 400,
        message: "Book creation failed",
        error: {
            code: "CREATION_ERROR",
            description: "The book could not be created due to missing or invalid data. Please verify all fields and try again."
        }
    });

    return res
    .status(200)
    .json(new ApiResponse(200, book,"Book added successfully"))
})

const updateDetails = asyncHandler(async(req,res)=>{
 
     const {bookId} = req.params;
     const updateFields = req.body;

     if (!bookId) {
        return res.status(404).json({
            status: 404,
            message: "Book not found",
            error: {
                code: "BOOK_NOT_FOUND",
                description: "The 'bookId' parameter is required ."
            }
        });
    }

     if (!updateFields || Object.keys(updateFields).length === 0) {
        return res.status(400).json({ 
            status: 404,
            message: "No update fields provided",
            error: {
                code: "DATA_NOT_FOUND",
                description: "Data is not enter to update."
            }});
    }

    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
            $set:updateFields
        },
        {
            new:true
        }
    )

    if(!updatedBook) return res.status(404).json({
        status: 404,
        message: "Book not found",
        error: {
            code: "BOOK_NOT_FOUND",
            description: "The book with the specified ID does not exist in the database."
        }
    })

    return res
    .status(200)
    .json(new ApiResponse(200,updatedBook,"Book data updated"))
})

const deleteBook = asyncHandler(async(req,res)=>{
    const {bookId} = req.params;

    if(!bookId) return res.status(404).json( {
        status:404,
         msg:"Bad Request",
         error:{
            code:"MISSING_BOOK_ID",
            description:"The bookId parameter is required ."
         }
      });

    const book = await Book.findByIdAndDelete(bookId)

    if (!book) return res.status(404).json({
        status: 404,
        message: "Book not found",
        error: {
            code: "BOOK_NOT_FOUND",
            description: "The book with the specified ID does not exist in the database."
        }
    });

    return res
    .status(200)
    .json(new ApiResponse(200, book, "Book deleted succcessfully"));
})

const allBooks = asyncHandler(async(req,res)=>{
   //destructure 
   const {page= 1, limit = 20, sortBy = "title", order = "asc", ...filters} = req.query;

   const pageNumber = parseInt(page)
   const pageSize = parseInt(limit)
   const skip = (pageNumber-1) * pageSize;

   //create a filter options object and add all options

   const filterOptions = {};
   if (filters.author) filterOptions.author = filters.author;
   if (filters.year) filterOptions.year = parseInt(filters.year);
   if (filters.price) filterOptions.price = { $lte: parseFloat(filters.price) }; 
   if (filters.condition) filterOptions.condition = filters.condition;
   
   //sorting order 
   const sortOptions = {[sortBy]:order === 'asc'? 1:-1}

   const books = await Book.find(filterOptions)
   .sort(sortOptions)
   .skip(skip)
   .limit(pageSize)

   if(!books) return res.status(404).json({
    status: 404,
    message: "Book not found",
    error: {
        code: "BOOK_NOT_FOUND",
        description: "The book with the given filter options does not exist in the database."
    }
})

   const totalBooks = await Book.countDocuments(filterOptions);

   //creating response here
 const response = {
     page:pageNumber,
     pageSize:limit,
     totalPages:Math.ceil(totalBooks/pageSize),
     totalBooks,
     books:{
        books
     }
 }

return res
.status(200)
.json(new ApiResponse(200,response,"Book fetched.."))
})

const bookDetails = asyncHandler(async(req,res)=>{
    const {bookId} = req.params;
    // console.log(req.params); checking paramater data receiving correctly
    
    if(!bookId) return res.status(400).json(
       {
        status:400,
         msg:"Bad Request",
         error:{
            code:"MISSING_BOOK_ID",
            description:"The bookId parameter is required ."
         }
      }
    )

    const book = await Book.findById(bookId)

    if(!book) return res.status(404).json({
        status:404,
        msg:"Book not found",
        error:{
           code:"BOOK_NOT_FOUND",
           description:"The book with the given ID does not exist in the database."
        }
     })

    return res
    .status(200)
    .json(new ApiResponse(200,book,"Book fetched successfully"))
})

export {
    addBook,
    updateDetails,
    deleteBook,
    allBooks,
    bookDetails
};