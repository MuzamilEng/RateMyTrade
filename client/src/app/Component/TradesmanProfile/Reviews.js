import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("tokken"));
        const response = await fetch(
          `http://localhost:5000/api/v1/review/get-reviews/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          console.log(reviews);
        } else {
          console.error(
            "Error fetching reviews:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchReviews();
  }, [id]);
  // useEffect(() => {
  //   console.log(reviews); // Log the updated reviews state
  // }, [reviews]);
  return (
    <>
      <section class="py-4 lg:py-6 bg-gray-100 font-poppins dark:bg-gray-800">
        <div class="flex justify-between items-center">
          <div>
            <h1 className="px-4 font-medium text-[1.5vw]">
              Ratings and Reviews
            </h1>
          </div>
          <button
            onClick={() => navigate(`/tradesman/${id}/review-form`)}
            class="px-4 py-2 text-white uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 mx-4 mb-4"
          >
            Add a Review
          </button>
        </div>
        <div class="max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
          <div>
            <h2 class="px-2 pb-2 mb-8 text-lg font-semibold border-b border-gray-300 dark:text-gray-300 dark:border-gray-700">
              Customer Reviews
            </h2>
          </div>
          <div class="mt-10">
            <div class="max-w-5xl px-2">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 lg:p-6 dark:bg-gray-700 dark:border-gray-700"
                >
                  <div className="md:block lg:flex">
                    <img
                      className="object-cover w-16 h-16 mr-4 rounded-full shadow"
                      src="/img/img_avatar.png"
                      alt="avatar"
                    />
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center justify-between mb-1">
                        <div className="mb-2 md:mb-0">
                          <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-400">
                            {review.name}
                          </h2>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {review.datePosted}{" "}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {/* Stars */}
                          {Array.from(
                            { length: review.overallRating },
                            (_, index) => (
                              <span key={index}>⭐</span>
                            )
                          )}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
                        {review.textReview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* {reviews.map(review => (
              <div key={review._id} class="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 lg:p-6 dark:bg-gray-700 dark:border-gray-700">
              <div class="md:block lg:flex">
                <img
                  class="object-cover w-16 h-16 mr-4 rounded-full shadow"
                  src="/img/img_avatar.png"
                  alt="avatar"
                />
                <div>
                  <div class="flex flex-wrap items-center justify-between mb-1">
                    <div class="mb-2 md:mb-0">
                      <h2 class="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-400">
                        {review.name}
                      </h2>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        {review.datePosted}{" "}
                      </p>
                    </div>
                    <div>
                      {Array.from({ length: review.overallRating }, (_, index) => (
                          <span key={index}>⭐</span>
                        ))}
                    </div>
                  </div>
                  <p class="mt-3 text-sm text-gray-700 dark:text-gray-400">
                    {review.textReview}
                    Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries,

                  </p>
                </div>
              </div>
            </div>
            ))} */}

              {/* <div class="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 lg:p-6 dark:bg-gray-700 dark:border-gray-700">
                <div class=" md:block lg:flex">
                  <img
                    class="object-cover w-16 h-16 mr-4 rounded-full shadow"
                    src="/img/img_avatar.png"
                    alt="avatar"
                  />
                  <div>
                    <div class="flex flex-wrap items-center justify-between mb-1">
                      <div class="mb-2 md:mb-0">
                        <h2 class="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-400">
                          John William
                        </h2>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          12 SEP 2012.{" "}
                        </p>
                      </div>
                      <div>
                        <ul class="flex items-center pb-1 mb-2">
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-half"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"></path>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p class="mt-3 text-sm text-gray-700 dark:text-gray-400">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries,
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
