import React, { Component } from 'react';
import Select from 'react-select'
import ImageService from './ImageService';

const imageService = new ImageService();

const options = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'Английский' },
  { value: 'uk', label: 'Украинский' }
]


class ImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      text: '',
      image: null,
      imagePreviewUrl: '',
      fromLanguage: null,
      toLanguage: null
    };
  }

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let image = event.target.files[0];
    reader.onloadend = () =>{
      this.setState({
        image: image,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(image)
  };


  handleFromLangChange = (fromLanguage1) => {
    this.setState({fromLanguage: fromLanguage1.value
    }, () =>
      console.log(`Option selected:`, this.state.fromLanguage)
    );
  };

  handleToLangChange = (toLanguage1) => {
    this.setState({toLanguage: toLanguage1.value
    }, () =>
      console.log(`Option selected:`, this.state.toLanguage)
    );
  };

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image_url', this.state.image, this.state.image.name);
    form_data.append('from_language', this.state.fromLanguage);
    form_data.append('to_language', this.state.toLanguage);

    imageService.postImageData(form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    ).then(result => this.setState({text: result}))
    .catch(err => console.log(err))  
  };
 
  

  render() {
    console.log(this.state.fromLanguage)
    let text = this.state.text;
    let fromLanguage = this.state.fromLanguage;
    let toLanguage = this.state.toLanguage;
    let imagePreviewUrl = this.state.imagePreviewUrl
    let $imagePreview = null;


    if(imagePreviewUrl){
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    let $textPreview = null;
    if (text) {
      $textPreview = (<h2>{text}</h2>);
    } else {
      $textPreview = (<p>Нет текста</p>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Перевести с:</label>
            {/* <input className="form-control" type="text" ref='fromLanguage' /> */}
            <Select 
              onChange={this.handleFromLangChange}
              options={options}
              />
              

            <label>
              Перевести на:</label>
            {/* <input className="form-control" type="text" ref='toLanguage' /> */}
            <Select 
              onChange={this.handleToLangChange}
              options={options}/>


            <input className="imageInput"
              type="file"
              onChange={this.handleImageChange} required/>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
        <div className="translatedText">
          {$textPreview}
        </div>
      </div>
    );
  }
} export default ImageDisplay;




