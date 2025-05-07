import './Profile.less';

const Profile = () => {
  return (
    <div className="page">
      <h1>个人介绍</h1>
      <div className="profile-content">
        <p>大家好，我是一名前端开发工程师。</p>
        
        <h2>技能专长</h2>
        <ul>
          <li>前端框架：React, Vue, Angular</li>
          <li>UI 库：Ant Design, Element UI, Material UI</li>
          <li>状态管理：Redux, Vuex, MobX</li>
          <li>构建工具：Webpack, Vite, Rsbuild</li>
        </ul>
        
        <h2>工作经历</h2>
        <p>我有5年的前端开发经验，曾在多家互联网公司担任前端开发工程师职位。</p>
        
        <h2>教育背景</h2>
        <p>计算机科学与技术专业本科毕业</p>
        
        <h2>兴趣爱好</h2>
        <p>在业余时间，我喜欢研究新的前端技术，参与开源项目，以及撰写技术博客分享我的经验。</p>
      </div>
    </div>
  );
};

export default Profile;