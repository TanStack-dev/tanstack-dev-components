import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@tanstack-dev/components';
import { add } from '@tanstack-dev/utils';

export const Route = createFileRoute('/button')({
  component: RouteComponent,
});

function RouteComponent() {
  const [nums, setNums] = useState({
    a: '',
    b: '',
  });

  const handleNumChange = (key: keyof typeof nums) => (e: any) => {
    setNums((prevNums) => ({
      ...prevNums,
      [key]: e.target.value,
    }));
  };

  return (
    <>
      <input type="text" value={nums.a} onChange={handleNumChange('a')} />
      <input type="text" value={nums.b} onChange={handleNumChange('b')} />
      <Button
        onClick={() => {
          alert(add(Number(nums.a), Number(nums.b)));
        }}
      >
        Add
      </Button>
    </>
  );
}
