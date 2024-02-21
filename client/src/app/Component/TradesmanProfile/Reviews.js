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
          <div class="mt-10 max-h-[400px] overflow-y-auto">
            <div class="max-w-5xl px-2">
              {reviews.length === 0 ? (
                <p className="text-lg text-gray-700 dark:text-gray-400">
                  No reviews available
                </p>
              ) : (
              reviews.map((review) => (
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
                      <div className="grid grid-cols-10 gap-2 mt-4">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review Image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )))}
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
