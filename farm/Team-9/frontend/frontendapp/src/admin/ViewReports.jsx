// pages/AnalyticsPage.js
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Typography, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;


function ViewReports() {
  const [loading, setLoading] = useState(true);
  const [chartVisible, setChartVisible] = useState(false);
  const [analysisVisible, setAnalysisVisible] = useState(false);
  const navigate = useNavigate();

  const rawData = {
    predicted_yield: 1.4,
    top_contributing_factors: [
      { feature: "Annual_Rainfall", value: -8.99, impact_score: 0.0177 },
      { feature: "Fertilizer", value: -0.32, impact_score: 0.0033 },
      { feature: "Pesticide", value: -0.32, impact_score: 0.0017 },
    ]
  };

  const COLORS = ["#FF8042", "#00C49F", "#0088FE"];

  const processedData = rawData.top_contributing_factors.map(item => ({
    name: item.feature,
    value: item.impact_score
  }));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setChartVisible(true);
      setTimeout(() => setAnalysisVisible(true), 1200);
    }, 3000); // Simulate backend load
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <Title level={2}>Yield Impact Report</Title>

      {loading && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin tip="Analyzing data..." size="large" />
        </div>
      )}

      {chartVisible && (
        <>
          <Title level={4}>
            Predicted Yield: {rawData.predicted_yield} tons/hectare
          </Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                animationDuration={1200}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {processedData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={v => v.toFixed(4)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}

      {analysisVisible && (
        <div style={{ marginTop: 32 }}>
          <Title level={5}>Detailed Analysis:</Title>
          <Paragraph>
            The rice crop yield prediction of <strong>1.40 units</strong> in Assam during the <strong>Kharif season</strong> appears to be negatively impacted by decreased annual rainfall, fertilizer, and pesticide application. However, the impact scores suggest these factors had a relatively small effect on the overall yield.
          </Paragraph>
          <Paragraph>
            Rainfall had the largest impact (0.0177), followed by fertilizer (0.0033), and then pesticide (0.0017). These values indicate relative influence, not absolute yield reduction.
          </Paragraph>
          <ul>
            <li><em>Units:</em> tons/hectare or kg/acre?</li>
            <li><em>Baseline Yield:</em> Expected yield without negative factors</li>
            <li><em>Other Factors:</em> Soil quality, irrigation, temperature</li>
            <li><em>Calculation:</em> How were scores derived?</li>
            <li><em>Significance:</em> Are values statistically meaningful?</li>
          </ul>
          <Paragraph>
            <strong style ={{ color: "#FF8042" }}>
            Overall, yield was slightly lower than expected, with reduced rainfall likely the biggest contributing factor.
            </strong>
          </Paragraph>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <Button type="primary" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default ViewReports;