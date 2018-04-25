import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BlogService {

  constructor(private authService: AuthService, private http: Http) { }

domain = "http://localhost:8080";
options;

// Function to create headers, add token, to be used in HTTP requests
createAuthenticationHeaders() {
  this.authService.loadToken(); // Get token so it can be attached to headers
//  console.log('auth service blog token is   '+this.authToken);
  // Headers configuration options
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json', // Format set to JSON
      'authorization': this.authService.authToken // Attach token
    })
  });
}



newBlog(blog){
  this.createAuthenticationHeaders();
  console.log('category is   '+blog.selectedCategory);
  return this.http.post(this.domain + '/blogs/newBlog', blog, this.options).map(res => res.json());
}

getAllBlogs(){
  this.createAuthenticationHeaders();
   return this.http.get(this.domain + '/blogs/allBlogs', this.options).map(res => res.json());
}


getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    console.log('inside');
    return this.http.get(this.domain + '/blogs/singleBlog/' + id, this.options).map(res => res.json());
  }


editBlog(blog) {
  this.createAuthenticationHeaders();
  console.log('tessssss');
  console.log('updated blog is   '+blog.title +'    '+ blog.body);
  return this.http.put(this.domain + '/blogs/updateBlog/' + blog, this.options).map(res => res.json());
}


deleteBlog(id) {
  this.createAuthenticationHeaders();
  return this.http.delete(this.domain +'/blogs/deleteBlog/' + id, this.options).map(res => res.json());
}



likeBlog(id) {
    const blogData = { id: id };
    console.log('blog id is  '+id);
    return this.http.put(this.domain + '/blogs/likeBlog/', blogData, this.options).map(res => res.json());
  }

  // Function to dislike a blog post
  dislikeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + '/blogs/dislikeBlog/', blogData, this.options).map(res => res.json());
  }





  postComment(id, comment){
    this.createAuthenticationHeaders();
    const blogData = {
      id: id,
      comment: comment
    }
    return this.http.post(this.domain + '/blogs/comment', blogData, this.options).map(res => res.json());
  }


}
