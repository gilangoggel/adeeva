import { useProductPage } from '../product-page-context'
import { CommentCard } from './comment-card'

export const CommentList = () => {
  const [ {comments} ] = useProductPage();
  return (
    <div>
      {
        comments.map(item=>(
          <CommentCard  key={item.id} {...item}/>
        ))
      }
    </div>
  );
};
