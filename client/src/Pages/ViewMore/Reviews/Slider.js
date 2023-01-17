import { Carousel, carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = ({img}) => {
  return (
    <div className='box'>
        <Carousel useKeyboardArrows={true}>
            {img.map( (imageUrl,index) => (
                <div className='slide' >
                    <img alt='sample-file' src={imageUrl} key={index} />
                </div>
            ))}
        </Carousel>
       
    </div>
  )
}

export default Slider