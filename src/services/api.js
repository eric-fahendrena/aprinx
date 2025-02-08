const API_BASE_URL = "http://localhost:8000";

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
