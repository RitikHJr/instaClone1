import { useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const setUser = useAuthStore((state) => state.setUser);

  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !userProfile) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${userProfile.uid}`);
    const userDocRef = doc(firestore, "users", userProfile.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(
          ref(storage, `profilePics/${userProfile.uid}`)
        );
      }

      const updatedUser = {
        ...userProfile,
        fullName: inputs.fullName || userProfile.fullName,
        username: inputs.username || userProfile.username,
        bio: inputs.bio || userProfile.bio,
        profilePicURL: URL || userProfile.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setUserProfile(updatedUser);
      setUser(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
