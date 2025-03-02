import axios from "axios";
import { Form } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * fetch user token
 * 
 * @returns {object}
 */
export const fetchUserToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/get-token`, {
      method: "GET",
      credentials: "include",
    });
    console.log(response)
    const data = await response.json();
    console.log("Fetch user token")
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

/**
 * fetch proile
 * @returns {object}
 */
export const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    if (response.status !== 200) {
      return false
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const updatePhoneNumber = async (pnbData) => {
  console.log(JSON.stringify(pnbData))
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/users/profile/phone-number/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(pnbData),
    })
    if (response.status !== 200) {
      return { error: true, code: response.status }
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const addCourse = async (data) => {
  const formData = new FormData()
  formData.append("category", data.category)
  formData.append("price", data.price)
  formData.append("title", data.title)
  formData.append("description", data.description)
  formData.append("cover_photo_file", data.coverPhotoFile)

  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/courses/add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    })

    if (response.status === 400) {
      return { error: true, code: 400 }
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error", error)
  }
}

export const fetchAllCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

export const fetchCourse = async (cId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

export const fetchRandCourse = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/random`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const sendReactionToCourse = async (cId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/react`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (response.status !== 200) {
      return { error: true, code: response.status }
    }
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const fetchCourseLiked = async (cId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/is-liked`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    if (response.status !== 200)
      return { error: true, code: response.status }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const uploadFile = async (file, type, onUploadProgress) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "aprix_1")
  formData.append("cloud_name", "dbmbskzzr")

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/dbmbskzzr/${type}/upload`, formData, {
      onUploadProgress: (progressEvent) => {
        return onUploadProgress && onUploadProgress(progressEvent)
      },
    })
    const data = await response.data
    return data
  } catch (error) {
    console.log("Error", error)
  }
}
export const sendCourseVideo = async (vData) => {
  const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("author_id", vData.author_id) 
  formData.append("url", vData.url)
  formData.append("thumbnail", vData.thumbnail)
  formData.append("title", vData.title)
  formData.append("description", vData.description)
  formData.append("access", vData.access)

  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${vData.course_id}/videos/add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    })
    if (!response.ok) {
      return { error: true, code: response.status }
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const fetchCourseVideos = async (cId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/videos`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const fetchCourseVideo = async (cId, vId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/videos/${vId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const sendTransaction = async (tData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transactions/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(tData),
    })
    const data = await response.json()
    if (response.status !== 200) 
      return { error: true, code: response.status }
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const fetchTransaction = async (transId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transactions?trans_id=${transId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    if (response.status !== 200) {
      console.error(await response.json())
      return { error: true, code: response.status }
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}
