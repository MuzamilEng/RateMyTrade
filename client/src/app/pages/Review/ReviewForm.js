import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [overallRating, setOverallRating] = useState(0);
  const [featureRatings, setFeatureRatings] = useState({
    valueForMoney: 0,
    qualityOfWork: 0,
    communication: 0,
    timeliness: 0,
  });
  const [textReview, setTextReview] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [postAnonymous, setPostAnonymous] = useState(false);
  const Background =
    "https://images.pexels.com/photos/5805491/pexels-photo-5805491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const handleOverallRatingChange = (rating) => {
    setOverallRating(rating);
  };

  const handleFeatureRatingChange = (feature, rating) => {
    setFeatureRatings((prevRatings) => ({
      ...prevRatings,
      [feature]: rating,
    }));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTextReviewChange = (event) => {
    setTextReview(event.target.value);
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);

    // Update state with removed image
    setImages(newImages);

};

  const handlePostAnonymousChange = () => {
    setPostAnonymous((prevValue) => !prevValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(images);



    const formData = new FormData();

    formData.append("name", name);
    formData.append("overallRating", overallRating);
    formData.append("featureRatings", JSON.stringify(featureRatings));
    formData.append("textReview", textReview);
    formData.append("postAnonymous", postAnonymous);

    images.forEach((image, index) => {
      formData.append("images", image);
    });
    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(
        `http://localhost:5000/api/v1/review/add-review/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Review submitted successfully");

        setOverallRating(0);
        setFeatureRatings({
          valueForMoney: 0,
          qualityOfWork: 0,
          communication: 0,
          timeliness: 0,
        });
        setTextReview("");
        setImages([]);
        setName("");
        setPostAnonymous(false);
        navigate(`/profile/${id}`);
      } else {
        console.error(
          "Error submitting review:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Background})`,
          height: "150vh",
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center items-center">
          <form
            action="post"
            onSubmit={handleSubmit}
            class="w-1/2 opacity-75  mt-4  mx-auto mb-12 p-4 bg-white shadow rounded"
          >
            <h2 class="text-2xl font-bold mb-4">Review Form</h2>
            <div class="mb-4">
              <label for="name" class="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                class="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="mb-4">
                <label class="block mb-1">Value for Money</label>
                <div class="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={`cursor-pointer text-2xl ${
                        featureRatings.valueForMoney &&
                        value <= featureRatings.valueForMoney
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        handleFeatureRatingChange("valueForMoney", value)
                      }
                    />
                  ))}
                </div>
              </div>
              <div class="mb-4">
                <label class="block mb-1">Quality of Work</label>
                <div class="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={`cursor-pointer text-2xl ${
                        featureRatings.qualityOfWork &&
                        value <= featureRatings.qualityOfWork
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        handleFeatureRatingChange("qualityOfWork", value)
                      }
                    />
                  ))}
                </div>
              </div>
              <div class="mb-4">
                <label class="block mb-1">Communication</label>
                <div class="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={`cursor-pointer text-2xl ${
                        featureRatings.communication &&
                        value <= featureRatings.communication
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        handleFeatureRatingChange("communication", value)
                      }
                    />
                  ))}
                </div>
              </div>
              <div class="mb-4">
                <label class="block mb-1">Timeliness of Completion</label>
                <div class="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={`cursor-pointer text-2xl ${
                        featureRatings.timeliness &&
                        value <= featureRatings.timeliness
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        handleFeatureRatingChange("timeliness", value)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div class="mb-4 mt-4">
              <label class="block mb-1">Overall Rating</label>
              <div class="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    className={`cursor-pointer text-2xl ${
                      overallRating && value <= overallRating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleOverallRatingChange(value)}
                  />
                ))}
              </div>
            </div>
            <div class="mb-4">
              <label for="message" class="block mb-1">
                Comment
              </label>
              <textarea
                value={textReview}
                onChange={handleTextReviewChange}
                rows="4"
                id="message"
                class="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="images" class="block mb-1">
                Upload Images
              </label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                class="border border-gray-300 p-2 rounded"
              />
              <div style={{ marginTop: "10px" }}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "10px",
                      }}
                    />
                    <button onClick={() => handleRemoveImage(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div class="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={postAnonymous}
                onChange={handlePostAnonymousChange}
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Post as Anonymous User
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Review
              </button>
              <Link to={`/profile/${id}`}>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
