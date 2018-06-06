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
  // removeTag = event => {
  //   event.preventDefault()
  //   let index = his.state.trashTags.indexOf(event.taget.name)
  //   this.setState({
  //     trashTags: [...this.state.trashTags, ,
  //     trashTag: ""
  //   })

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
        user_id: 2, //need to get the user id
        title: this.state.trashTitle,
        content: 'hello', // need to get the content
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
          this.props.addPost(data)
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
      trashPic = <img src={trashPicUrl} style={{ maxWidth: '100%' }}/>;
    } else {
      trashPic = null;
    }

    if (trashTags) {
      tags = trashTags.map(tag => {
        return <span className="tag">{tag}</span>;
      });
    }

    return (
      <div>
        {trashPic}
        <div className="modal-card">
          <form onSubmit={this.handleFormSubmit}>
            <section className="modal-card-body">
              <Dropzone onDrop={this.handleDrop} multiple accept="image/*" />
              <p className="modal-card-title">make a curb alert</p>
              <br />

              <div class="field is-grouped">
                <p className="control is-expanded">
                  <input
                    name="trashTag"
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

              <div className="field">
                <label className="label">Location</label>
                <input
                  className="input"
                  type="text"
                  placeholder="123 Montreal ave Montreal"
                  name="address"
                  onChange={this.handleChange}
                />
              </div>
              <button className="button is-light">Submit</button>
            </section>
          </form>
        </div>
        {tags}
      </div>
    );
  }
}
export default NewPost;
