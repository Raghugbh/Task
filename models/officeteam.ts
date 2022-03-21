import { Document, model, Schema} from 'mongoose';
const OfficeTeamSchema = new Schema({
    customer_code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    basicsal: {
        type: String,
        required: true
    }
});

const Company = model('OfficeTeam', OfficeTeamSchema);

export default Company;
