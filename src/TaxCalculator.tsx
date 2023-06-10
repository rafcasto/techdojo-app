import React, { useState } from 'react';
import axios from 'axios';
import { CalculateButton, Summary, AlertComponent, InputText } from '@rafcasto/techdojo-template-storybook';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

interface TaxResult {
  taxRate: number;
  owningTax: number;
}

interface TaxSummaryProps {
  income: string;
  taxResult: TaxResult | null;
}

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<string>('');
  const [taxResult, setTaxResult] = useState<TaxResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateTax = async () => {
    try {
      const response = await axios.post<TaxResult>('http://24.199.68.169:8081/api/calculateTax', { income });
      setTaxResult(response.data);
      setError(null);
    } catch (error) {
      setTaxResult(null);
      setError('An error occurred while calculating tax.');
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} padding={4}>
        <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
          <InputText
            id="test"
            label="Income"
            fullwidth
            variant="standard"
            handleInputChange={(e) => setIncome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
          <CalculateButton
            onClick={calculateTax}
            label="Calculate Tax"
            fullWidth
            variant="contained"
            backgroundColor="primary"
            size="large"
          />
        </Grid>
        <Grid item xs={12}>
          {taxResult !== null && (
            <Summary
              taxDetails={{
                tax: taxResult?.taxRate,
                total: taxResult?.owningTax
              }}
            />
          )}
          {error && <AlertComponent message={error} severity="error" />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaxCalculator;
