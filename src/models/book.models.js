import mongoose,{Schema} from "mongoose";

const bookSchema = new Schema({
    bookName:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    year:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    discount:{
        type:Number,
        default:0,
        require:true
    },
    pages:{
        type:Number,
        default:0,
        require:true
    },
    condition:{
        type:String,
        enum: ['new', 'used'],
        default:'new',
        require:true
    },
    description:{
        type:String
    }
},
{
    timestamps:true
})

bookSchema.statics.isValidCondition = async function(type) {
    const validConditions = ['new', 'used'];
    return validConditions.includes(type);
}

export const Book = mongoose.model("Book",bookSchema)