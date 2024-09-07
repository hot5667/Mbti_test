import React, { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  
  // 무엇을 formData 에 넣어야 할까요?
  const [formData, setFormData] = useState({
		
  });

  const handleChange = (e) => {

  };

  const handleSubmit = (e) => {

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디"
        required
      />
      <input

      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
      )}
      <button type=?????>
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
