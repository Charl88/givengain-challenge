import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '../auth.guard'

describe('AuthGuard', () => {
  let authGuard: AuthGuard

  beforeEach(() => {
    authGuard = new AuthGuard()
  })

  const mockExecutionContext = (
    authHeader: string | undefined
  ): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: authHeader
          }
        })
      })
    }) as unknown as ExecutionContext

  it('should throw UnauthorizedException if authorization header is missing', () => {
    const context = mockExecutionContext(undefined)
    expect(() => authGuard.canActivate(context)).toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if authorization header is not Basic', () => {
    const context = mockExecutionContext('Bearer token')
    expect(() => authGuard.canActivate(context)).toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if credentials are invalid', () => {
    const context = mockExecutionContext(
      'Basic ' + Buffer.from('invalid:credentials').toString('base64')
    )
    expect(() => authGuard.canActivate(context)).toThrow(UnauthorizedException)
  })

  it('should return true if credentials are valid', () => {
    const context = mockExecutionContext(
      'Basic ' + Buffer.from('testuser:testpassword').toString('base64')
    )
    expect(authGuard.canActivate(context)).toBe(true)
  })
})
