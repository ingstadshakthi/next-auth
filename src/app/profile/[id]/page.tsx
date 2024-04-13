export default function Profile({ params }: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>ProfilePage</h1>

      <p>{params.id}</p>
    </div>
  );
}
