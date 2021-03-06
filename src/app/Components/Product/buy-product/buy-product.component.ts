import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInUpOnEnterAnimation, jelloAnimation, swingAnimation, tadaAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { Product } from 'src/app/Models/product';
import { Review } from 'src/app/Models/review';
import { ReviewLike } from 'src/app/Models/reviewLike';
import { User } from 'src/app/Models/user';
import { CartService } from 'src/app/services/cart.service';
import { HistoryService } from 'src/app/services/history.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewLikeService } from 'src/app/services/review-like.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation(),
    jelloAnimation(),
    tadaAnimation()
  ]
})
export class BuyProductComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService,
    private cartService: CartService, private modalService: NgbModal, private reviewService: ReviewService, private formBuilder: FormBuilder, private datePipe: DatePipe,
    private reviewLikeService: ReviewLikeService, private historyService: HistoryService) { }

  reviewList: Review[] = [];
  selectedProduct: Product = new Product();
  email: string;
  isRated: boolean = false;
  reviewLikeList: ReviewLike[] = [];
  reviewAlreadyWrote: boolean = false;
  reviewIdToDelete: number = -1;
  isVerified: boolean = false;
  quantityLeft: number = 0;
  rate: number = 4;
  productRate: number = 0;
  isJello: boolean = false;
  isTada: boolean = false;

  public addReviewForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  ctrl = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.getProductById(Number(this.route.snapshot.paramMap.get('productId')));
    if (this.isUserLogin) {
      this.email = this.getUserEmail();
      this.getLikesByEmailAndReviewId(this.email);
    }
  }

  toggleJello() {
    this.isJello = !this.isJello;
  }

  toggleTada() {
    this.isTada = !this.isTada;
  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe(data => {
      this.selectedProduct = data;
    })

    this.getReviewsByProductId(productId);
    this.reviewExists(productId);
  }

  addToCart(selectedItem: any, content) {
    this.cartService.addToCart(selectedItem);
    this.getQuantityCalculatedInCart(selectedItem.productId);
    this.modalService.open(content);
  }

  goToCart() {
    this.modalService.dismissAll();
    this.router.navigate(['/cart']);
  }

  getUserEmail() {
    return this.userService.getEmail();
  }

  getReviewsByProductId(productId: number) {
    return this.reviewService.getReviewsByProductId(productId).subscribe(data => {
      this.reviewList = data;
      let stars = data.reduce((accumulator, current) => accumulator + current.stars, 0) / this.reviewList.length;
      this.productRate = stars > 0 ? stars : 0;
    })
  }

  onSubmit() {
    return this.reviewService.verifyReview(this.email, this.selectedProduct.productId).subscribe(data => {
      let success = data;
      if (success) {
        this.saveReview();
      } else {
        this.toastr.info('You already wrote a review on this product', 'Review', {
          positionClass: 'toast-top-center'
        })
      }
    })
  }

  reviewExists(productId: number) {
    return this.reviewService.verifyReview(this.email, productId).subscribe(data => {
      this.reviewAlreadyWrote = data;
      this.verifiedPurchase(productId);
    })
  }

  verifiedPurchase(productId: number) {
    return this.historyService.verifyPurchase(this.email, productId).subscribe(data => {
      this.isVerified = data;
      this.getQuantityCalculatedInCart(productId);
    })
  }

  getQuantityCalculatedInCart(productId: number) {
    this.quantityLeft = this.selectedProduct.quantity - this.cartService.getQuantityOfProduct(productId);
  }

  saveReview() {
    let title = this.addReviewForm.controls['title'].value;
    let description = this.addReviewForm.controls['description'].value;
    let stars = this.ctrl.value;
    let verifiedPurchase = this.isVerified;
    let usefulCount = 0;
    let date = new Date();
    let reviewDate = this.datePipe.transform(date, 'yyyy-MM-dd hh:mm:ss');

    return this.reviewService.saveReview(this.selectedProduct.productId, this.email, title, description, stars, verifiedPurchase, usefulCount, reviewDate).subscribe(data => {
      this.toastr.success('Review Submitted Successfully', 'Review', {
        positionClass: 'toast-top-center'
      })
      this.addReviewForm.controls['title'].setValue('');
      this.addReviewForm.controls['description'].setValue('');

      this.ctrl.setValue(null);
      this.getReviewsByProductId(this.selectedProduct.productId);
    })
  }

  verifyLike(reviewId: number, event: MouseEvent, valueFromButton?: number) {
    return this.reviewLikeService.verifyLike(reviewId, this.email).subscribe(data => {
      let success = data;
      let eventName = event.toString();
      let likeValue = 0;
      let usefulCount = 0;
      switch (eventName) {
        case "like":
          likeValue = 1;
          usefulCount = 2;
          break;

        case "dislike":
          likeValue = -1;
          usefulCount = -2;
          break;
      }

      if (success) {
        this.saveLike(reviewId, this.email, likeValue);

      } else {
        this.updateLike(reviewId, this.email, valueFromButton);
      }
    })
  }

  saveLike(reviewId: number, email: string, likeValue: number) {
    return this.reviewLikeService.saveLike(reviewId, email, likeValue).subscribe(data => {
      this.getLikesByEmailAndReviewId(this.email);
    })
  }

  updateLike(reviewId: number, email: string, likeValue: number) {
    return this.reviewLikeService.updateLike(reviewId, email, likeValue).subscribe(data => {
      this.getLikesByEmailAndReviewId(this.email);
    })
  }

  updateUsefulCount(reviewId: number, email: string) {
    return this.reviewService.updateUsefulCount(reviewId, email).subscribe(data => {
      this.getReviewsByProductId(this.selectedProduct.productId);
    })
  }

  getLikesByEmailAndReviewId(email: string) {
    return this.reviewLikeService.getLikesByEmailAndReviewId(email, 1).subscribe(data => {
      this.reviewLikeList = data;
      this.updateUsefulCount(this.selectedProduct.productId, this.email);
    })
  }

  calculate(reviewId: number) {
    for (let reviewLike of this.reviewLikeList) {
      if (reviewLike.reviewId == reviewId) {
        //TIENE LIKE
        switch (reviewLike.likeValue) {
          case -1:
            return -1;

          case 1:
            return 1;

        }
      }
    }
    return 0;
  }

  openModalDelete(content, reviewId: number) {
    this.modalService.open(content);
    this.reviewIdToDelete = reviewId;
  }

  deleteOwnReview() {
    return this.reviewLikeService.deleteReviewLike(this.reviewIdToDelete).subscribe(data => {
      this.deleteReview(this.reviewIdToDelete);
    })
  }

  deleteReview(reviewIdToDelete: number) {
    return this.reviewService.deleteReview(reviewIdToDelete).subscribe(data => {
      this.getReviewsByProductId(this.selectedProduct.productId);
      this.modalService.dismissAll();
      this.toastr.success('Review deleted successfully', 'Review', {
        positionClass: 'toast-top-center'
      })
    });
  }

  get isUserLogin() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(Constants.USER_KEY));
  }

}
