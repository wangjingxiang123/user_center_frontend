import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './Welcome.less';

const { Title, Text } = Typography;

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card className={styles.welcomeCard}>
        <Title level={2}>欢迎来到用户中心</Title>
        <Text>在这里，你可以管理你的个人信息和设置。</Text>
        <div className={styles.dogImages}>
          <img src="/dog1.jpg" alt="小狗1" className={styles.dogImage} />
          <img src="/dog2.jpg" alt="小狗2" className={styles.dogImage} />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;

