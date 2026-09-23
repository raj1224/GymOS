import mongoose from 'mongoose';

const membershipplanSchema = mongoose.Schema(
const membershipPlanSchema = new mongoose.Schema(
    {
        name: String,

        duration: Number, // months

        price: Number,

        description: String,

        features: [String],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const MembershipPlan = mongoose.model(
    "MembershipPlan",
    membershipPlanSchema
);

const MembershipPlan = mongoose.model('MembershipPlan', membershipplanSchema)
export default MembershipPlan
export default MembershipPlan;
