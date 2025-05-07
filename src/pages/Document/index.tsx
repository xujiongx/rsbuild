import React, { JSX } from 'react';
import './index.less';

// 模拟 React 19 的 Document 组件
const DocumentComponent = ({ children }: { children: React.ReactNode }) => (
  <div className='document-container'>{children}</div>
);

const Heading = ({
  level = 1,
  children,
}: {
  level?: number;
  children: React.ReactNode;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className='document-heading'>{children}</Tag>;
};

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className='document-paragraph'>{children}</p>
);

const DocumentPage = () => {
  return (
    <div className='page document-page'>
      <h1>文档示例</h1>
      <p className='subtitle'>使用 React 19 Document 组件的示例页面</p>

      <DocumentComponent>
        <Heading level={1}>React 19 新特性介绍</Heading>
        <Paragraph>
          React 19 是 React 库的最新主要版本，带来了许多令人兴奋的新功能和改进。
          本文档将介绍其中一些最重要的特性。
        </Paragraph>

        <Heading level={2}>1. 新的 React 编译器</Heading>
        <Paragraph>
          React 19
          引入了一个新的编译器，可以自动优化组件渲染，减少不必要的重新渲染，提高性能。
          这个编译器能够分析组件的依赖关系，并生成更高效的代码。
        </Paragraph>

        <Heading level={2}>2. 文档类型组件</Heading>
        <Paragraph>
          React 19 引入了文档类型组件，专门用于处理大型文档和富文本内容。
          这些组件提供了优化的文档渲染、富文本支持、文档片段管理等功能。
        </Paragraph>

        <Heading level={3}>主要特点</Heading>
        <ul className='document-list'>
          <li>优化的文档渲染性能</li>
          <li>内置富文本支持</li>
          <li>文档片段管理</li>
          <li>协作编辑支持</li>
          <li>版本控制功能</li>
        </ul>

        <Heading level={2}>3. Actions</Heading>
        <Paragraph>
          React 19 引入了 Actions，这是一种新的处理表单和用户交互的方式。
          Actions 允许开发者直接在组件中定义服务器端逻辑，简化了表单处理流程。
        </Paragraph>

        <Heading level={2}>4. 资源加载 API</Heading>
        <Paragraph>
          新的资源加载 API 允许组件声明它们需要的资源，React
          会自动管理加载状态。 这简化了数据获取和资源管理的过程。
        </Paragraph>

        <Heading level={2}>结论</Heading>
        <Paragraph>
          React 19
          带来了许多强大的新特性，使得开发更加高效，应用性能更好，用户体验更加流畅。
          随着 React 19 的正式发布，我们可以期待更多的官方文档和示例。
        </Paragraph>
      </DocumentComponent>
    </div>
  );
};

export default DocumentPage;
