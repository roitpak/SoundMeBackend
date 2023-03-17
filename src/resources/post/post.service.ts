import PostModel from "./post.model";
import Post from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {

        try {

            const post = await this.post.create({ title, body });
            return post;

        } catch (e) {

            throw new Error('unable to create post  ');

        }
    }
}
export default PostService;