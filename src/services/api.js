import axios from "axios";

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
    const data = await response.json();
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
      return undefined
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getAllUsersRequest = async (offset, limit) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const convertUserToTeacherRequest = async (userId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/convert-to-teacher`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
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

export const getBoughtCoursesCountRequest = async () => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile/bought-courses/count`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error);
  }
}

export const getBoughtCoursesRequest = async (offset, limit) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile/bought-courses?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const createCourseRequest = async (cData) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/courses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cData),
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

export const deleteCourseRequest = async (courseId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getAllCoursesRequest = async (offset, limit) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

export const getCoursesByKeywordRequest = async (keyword, offset, limit) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/search?keyword=${keyword}&offset=${offset}&limit=${limit}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getCourseRequest = async (cId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
  }
}

export const getRandCourseRequest = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/random`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const createCourseLikeRequest = async (cId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/course-likes/${cId}/add`, {
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

export const getCourseLikeRequest = async (cId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE_URL}/api/course-likes/${cId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    if (response.status !== 200)
      throw new Error("Error", response.status)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const uploadFileRequest = async (file, type, onUploadProgress) => {
  try {
    console.log("Upload file")
    const presignedUrlResponse = await fetch(`${API_BASE_URL}/api/upload/presigned-url?key=${file.name}`)
    const psuData = await presignedUrlResponse.json()

    const response = await axios.put(psuData.signedUrl, file, {
      onUploadProgress: (progressEvent) => {
        return onUploadProgress && onUploadProgress(progressEvent)
      },
      headers: {
        "Content-Type": file.type,
      }
    })
    const data = await response.data
    console.log("Upload data", data)
    return { url: psuData.fileUrl }
  } catch (error) {
    console.log("Error", error)
  }
}

export const createCourseVideoRequest = async (vData) => {
  const token = localStorage.getItem("token")

  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${vData.course_id}/videos/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(vData),
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

export const getCourseVideosRequest = async (cId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/videos`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getCourseVideoRequest = async (cId, vId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/videos/${vId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const sendCourseTransactionRequest = async (tdata) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transactions/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(tdata),
    })
    const data = await response.json()
    if (response.status !== 200) 
      return { error: true, code: response.status }
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getCourseTransactionsRequest = async (offset, limit) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transactions?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error", error)
  }
}

export const getCourseTransactionCountRequest = async () => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transactions/count`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error", error)
  }
}

export const getTransactionRequest = async (transId) => {
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

export const confirmCourseTransactionRequest = async (transId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transactions/confirm?trans_id=${transId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const refuseTransactionRequest = async (transId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/course-transaction/refuse?trans_id=${transId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error", error)
  }
}

export const createCourseCommentRequest = async (cId, cmtData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cmtData),
    })
    if (response.status !== 200)
      throw new Error("Error", response.status)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getCourseCommentsRequest = async (cId, query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${cId}/comments?limit=${query.limit}&offset=${query.offset}`);
    if (response.status !== 200)
      throw new Error("Error", response.status);
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error);
  }
}

export const getAllNotificationsRequest = async (offset, limit) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getUnseenNotificationsCountRequest = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/unseen-count`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error)
  }
}

export const seeAllNotificationRequest = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/see-all`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const readNotificationRequest = async (notifId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${notifId}/read`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const createCourseAccessRequest = async (courseId, userId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-course-access/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId, userId })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getCourseAccessRequest = async (courseId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-course-access/${courseId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const createDeletedCourseRequest = async (dcData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/deleted-courses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(dcData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getSubscriptionRequest = async (userId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/teacher-subscriptions/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const createSubscriptionTransactionRequest = async (tData) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscription-transactions/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(tData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error);
  }
}

export const getPendingSubscriptionTransactionsRequest = async (offset, limit) => {
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscription-transactions/pending?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const confirmSubscriptionTransactionRequest = async (transId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscription-transactions/${transId}/confirm`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}

export const getPendingSubscriptionTransactionsCountRequest = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscription-transactions/count`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error", error)
  }
}
