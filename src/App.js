import React, {Component} from 'react';

import database from "./utils/database";
import {Promise} from "q";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book_title: '',
      book_author: '',
      books: []
    };
    this.db = database();
  }

  componentDidMount() {
     this.getBooks().then((val) => {
      this.setState({books: val});
    });
  }

  getBooks = () => {
    let docRef = this.db.collection('books');
    let allBooks = [];
    return docRef.get().then(function (querySnapshot) {
      querySnapshot.docs.forEach((doc) => {
        allBooks.push(doc.data());
      });
      return Promise.resolve(allBooks);
    }).catch(() => {
      return Promise.reject();
    });
  };

  onSaveClicked = (event) => {
    const data = (({book_title, book_author}) => ({book_title, book_author}))(this.state);
    let docRef = this.db.collection('books').doc(Date.now().toString());
    docRef.set(data)
      .then(() => {
        let books = this.state.books;
        books.push(data);
        this.setState({'books': books});
        this.clearTextFields();
      })
      .catch(err => console.error(err));
  };

  clearTextFields() {
    this.setState({
      book_title: '',
      book_author: ''
    });
  }

  onTextInputChange = (event) => {
    const text = event.target.value;
    const id = event.target.id;
    this.setState({[id]: text});
  };

  renderTable = () => {
    let allRows = [];
    this.state.books.forEach((book, index) => {
      allRows.push(
        <tr key={index}>
          <td>{book.book_title}</td>
          <td>{book.book_author}</td>
        </tr>);
    });
    return allRows;
  };


  render() {
    return (
      <div className="container center-align">
        <div className='row'>
          <div className="input-field col s6">
            <input id="book_title" value={this.state.book_title} type="text" onChange={this.onTextInputChange}/>
            <label htmlFor="book_title">Book title</label>
          </div>
          <div className="input-field col s6">
            <input id="book_author" value={this.state.book_author} type="text" onChange={this.onTextInputChange}/>
            <label htmlFor="book_author">Author</label>
          </div>
        </div>

        <div className='row'>
          <button onClick={this.onSaveClicked} className='waves-effect waves-light btn'>Save</button>
        </div>
        <div className='row'>
          <table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
            </thead>
            <tbody>
            {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;