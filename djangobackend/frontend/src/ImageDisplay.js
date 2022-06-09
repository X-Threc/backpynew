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
      toLanguage: null,
      drag: false
    };
  }

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let image = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: image,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(image)
  };


  handleFromLangChange = (fromLanguage1) => {
    this.setState({
      fromLanguage: fromLanguage1.value
    }, () =>
      console.log(`Option selected:`, this.state.fromLanguage)
    );
  };

  handleToLangChange = (toLanguage1) => {
    this.setState({
      toLanguage: toLanguage1.value
    }, () =>
      console.log(`Option selected:`, this.state.toLanguage)
    );
  };

  handleSubmit(event) {
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
    ).then(result => this.setState({ text: result }))
      .catch(err => console.log(err))
  };



  render() {
    let text = this.state.text;
    let fromLanguage = this.state.fromLanguage;
    let toLanguage = this.state.toLanguage;
    let imagePreviewUrl = this.state.imagePreviewUrl
    let $imagePreview = null;
    let drag =this.state.drag;
    console.log("drag",drag)

    if (imagePreviewUrl) {
      $imagePreview = (<img height={500}src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Выберите изображение для перевода</div>);
    }

    let $textPreview = null;
    if (text) {
      $textPreview = (<h2>{text}</h2>);
    } else {
      $textPreview = (<p className='text-secondary d-flex justify-content-center'>Перевод не получен</p>);
    }

    return (
      <div className="previewComponent bg-dark">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group d-flex justify-content-center align-items-center rounded-bottom bg-secondary mr-4 ml-4">
            <div className='w-25 pr-2 m-2'>
              <label>Перевести с:</label>
              <Select
                onChange={this.handleFromLangChange}
                options={options} />
            </div>
            <div className='w-25 pr-2 mr-2'>
              <label>Перевести на:</label>
              <Select
                onChange={this.handleToLangChange}
                options={options} />
            </div>
            <input className="btn btn-dark text-warning" type="submit" value="Перевести" />
          </div>
          <div className='imageInput d-flex flex-column border rounded bg-dark  text-white ml-4 mr-4 p-1'>
            <input
            type="file"
            onChange={this.handleImageChange} required />

            <div className="imgPreview position-relative p-1">
              {$imagePreview}
            </div>
          </div>
        </form>
        
        <div className="translatedText border rounded bg-white m-4 h-100">
          {$textPreview}
        </div>
      </div>
    );
  }
} export default ImageDisplay;




