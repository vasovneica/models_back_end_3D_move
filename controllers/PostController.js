import PostModel from "../models/Post.js";


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("xxx").exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get all modelspage",
        })

    }
}


export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        )
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: "modelpage not found" });
            });
    }



    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get one modelpage",
        })

    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.findOneAndDelete({
            _id: postId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(500).json({
                        message: "failed to get one modelpage",
                    });
                }
                res.json({
                    success: true,
                })
            })

            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: "failed to delete one modelpage" });
            });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get one modelpage",
        })

    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });
        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to create the modelpage",
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,
        },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            }).then(
                res.json({
                    success: true
                })
            )
            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: "failed to update modelpage" });
            });
    }
    catch (error) {
        console.log(error);
    }
}

