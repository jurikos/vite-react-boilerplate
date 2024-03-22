const useNavigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...mod,
    useNavigate: () => useNavigateMock,
  };
});

export default useNavigateMock;
