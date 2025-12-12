import mongoose, { Mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });


const edgeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    target: {
        required: true,
        type: String,
    }
}, {
    _id: false
});

const workflowNodeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
        required: true
    },
    data: {
        kind: { // this is kind of duplicate and redundant should be only in nodeSchema 
            type: String,
            enum : ["ACTION","TRIGGER"],
            required: true
        },
        metadata: {
            type : mongoose.Schema.Types.Mixed,
            required: true 
        }
    },
    position: {
        x:{
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        }
    },
    credentials: {
        type: mongoose.Schema.Types.Mixed,
    }
}, {_id: false});


const nodeSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["priceTrigger", "timeTrigger", "hyperliquid", "backpack", "lighter", "email"],
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["ACTION", "TRIGGER"],
        required: true
    },
    credentials: [{
        title: { // this field is the title of credential what is it username/ api key or anything else
            type: String, // there may be different types of credentials for different platforms like hyperliquid supports api keys and backpack supposrt username password
            required: true,
        },
        value: {
            type: String, // this states its values
            required: true,
        }
    }]

})

const workflowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    trigger: {
        type: String,
        required: true
    },
    nodes: [workflowNodeSchema],
    edges: [edgeSchema]
});

const executionSchema = new mongoose.Schema({
    workflow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workflow"
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    endTime:{
        type: Date
    },
    status: {
        type: String,
        enum: ["PENDING","SUCCESS", "FAILURE"]
    }
},{timestamps: true});

export const Node = mongoose.model('Node', nodeSchema);
export const User = mongoose.model('User', userSchema);
export const Workflow = mongoose.model('Workflow', workflowSchema);
export const Execution = mongoose.model("Execution", executionSchema);
