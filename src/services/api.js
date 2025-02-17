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

export const addCourse = async (data) => {
  const formData = new FormData()
  formData.append("category", data.category)
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

export const sendCourseVideo = async (vData) => {
  const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("author_id", vData.author_id) 
  formData.append("video_file", vData.video_file)
  formData.append("thumbnail_file", vData.thumbnail_file)
  formData.append("title", vData.metadata.title)
  formData.append("description", vData.metadata.description)
  formData.append("access", vData.metadata.access)

  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${vData.course_id}/videos/add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    })
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
