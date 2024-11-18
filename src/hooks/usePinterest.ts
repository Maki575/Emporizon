import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PinterestService, Pin } from '../services/pinterest';

const pinterestService = new PinterestService();

export function usePinterestAuth() {
  const queryClient = useQueryClient();

  const authenticate = useMutation({
    mutationFn: (code: string) => pinterestService.authenticate(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pinterest-pins'] });
    },
  });

  const logout = () => {
    pinterestService.logout();
    queryClient.invalidateQueries({ queryKey: ['pinterest-pins'] });
  };

  return {
    isAuthenticated: pinterestService.isAuthenticated(),
    authenticate,
    logout,
  };
}

export function usePinterestPins() {
  return useQuery<Pin[]>({
    queryKey: ['pinterest-pins'],
    queryFn: () => pinterestService.getUserPins(),
    enabled: pinterestService.isAuthenticated(),
  });
}

export function usePinterestPin(pinId: string) {
  return useQuery<Pin>({
    queryKey: ['pinterest-pin', pinId],
    queryFn: () => pinterestService.getPin(pinId),
    enabled: pinterestService.isAuthenticated() && !!pinId,
  });
}