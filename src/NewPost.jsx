import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Geocode from 'react-geocode';

const vision = require('node-cloud-vision-api');
vision.init({ auth: process.env.REACT_APP_GOOGLE_API_KEY });

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trashPicUrl: null,
      trashTags: [],
      trashTitle: null,
      trashTag: null,
      content: null,
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.addTag = this.addTag.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  addTag = event => {
    event.preventDefault();
    this.setState({
      trashTags: [...this.state.trashTags, this.state.trashTag],
      trashTag: '',
    });
  };

   removeTag = event => {
     event.preventDefault()
     let newtags = this.state.trashTags.filter(tag => tag != event.target.name);
     this.setState({
       trashTags: newtags
    })
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/')
      .then(function(response) {
        console.log(response.data);
        //set state for trash posts
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      formData.append('upload_preset', 'iyxcz7xd');
      formData.append('api_key', process.env.REACT_APP_VISION_API_KEY);
      formData.append('timestamp', (Date.now() / 1000) | 0);

      // Make an upload request to cloudinary
      return axios
        .post('https://api.cloudinary.com/v1_1/trasher/image/upload/', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; //URL for future references
          const url = data.url;
          console.log(data);

          this.setState({
            trashPicUrl: data.url,
            trashTitle: data.original_filename,
          });

          console.log(data.url);
          // VISION part - takes url and responds with labes
          const req = new vision.Request({
            image: new vision.Image({
              url: url,
            }),
            features: [new vision.Feature('LABEL_DETECTION', 10)],
          });

          vision.annotate(req).then(
            res => {
              // handling response from VISION
              if (res.responses[0].labelAnnotations) {
                let tags = res.responses[0].labelAnnotations.map(ann => {
                  return ann.description;
                });
                this.setState({
                  trashTags: tags,
                });
              }
            },
            e => {
              console.log('Error: ', e);
            },
          );
        });
    });
    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      console.log('hello');
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    Geocode.fromAddress(this.state.address).then(response => {
      const { lat, lng } = response.results[0].geometry.location;
      this.setState({ geo_tag: `${lat}, ${lng}` });

      const data = {
        user_id: this.props.currentUser.id, //need to get the user id
        title: this.state.trashTitle,
        content: this.state.content, // need to get the content
        image_url: this.state.trashPicUrl,
        geo_tag: this.state.geo_tag,
        point_value: 6,
        tags: this.state.trashTags,
        visible: true,
      };

      axios
        .post('http://localhost:3001/api/posts', data)
        .then(res => {
          console.log(res);
          this.props.addPost(data);
          this.setState({
            trashPicUrl: null,
            trashTags: [],
            trashTitle: null,
            trashTag: null,
          });
        })
        .catch(err => {
          console.log();
        });
    });
  };

  render() {
    let { trashPicUrl, trashTags } = this.state;
    let trashPic = null;
    let tags = null;
    if (trashPicUrl) {
      trashPic = <img style={{ minWidth: '100%', minHeight: '100%' }} src={trashPicUrl} />;
    } else {
      trashPic = null;
    }

    if (trashTags) {
      tags = trashTags.map(tag => {
        return (
          <div className="control">
            <div className="tags has-addons">
              <a className="tag is-link">{tag}</a>
              <a className="tag is-delete" name={tag} onClick={this.removeTag} />
            </div>
          </div>
        );
      });
    }

    return (
      <div className='upload-form'>
        <div className="box" style={{ maxWidth: '40%', minHeight: '200px' }}>
          <article className="media">
            <div className="media-left">
              <Dropzone onDrop={this.handleDrop} multiple accept="image/*">
                {trashPic || 'click or drag and drop an image'}
              </Dropzone>
            </div>
            <div className="media-content">
              <form onSubmit={this.handleFormSubmit}>
                <div className="field">
                  <textarea
                    onChange={this.handleChange}
                    className="textarea"
                    name="content"
                    placeholder="Description"
                  />
                </div>
                <div className="field">
                  <input
                    className="input"
                    type="text"
                    placeholder="address"
                    name="address"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      name="trashTag"
                      placeholder="add tags"
                      onChange={this.handleChange}
                      className="input"
                      type="text"
                      value={this.state.trashTag}
                    />
                  </p>
                  <p className="control">
                    <a className="button is-info" onClick={this.addTag}>
                      + tag
                    </a>
                  </p>
                </div>
                <nav className="level is-mobile">
                  <button className="button is-light">Submit</button>
                </nav>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <div
                      style={{ width: '350px' }}
                      className="field is-grouped is-grouped-multiline"
                    >
                      {tags}
                    </div>
                  </div>
                </nav>
              </form>
            </div>
          </article>
        </div>
</div>
    );
  }
}
export default NewPost;
